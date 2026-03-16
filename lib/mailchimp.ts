const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
const MAILCHIMP_DC = process.env.MAILCHIMP_DC

export class MailchimpError extends Error {
  public status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'MailchimpError'
  }
}

export async function subscribeEmail(email: string) {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_DC) {
    throw new Error('As variáveis de ambiente do Mailchimp não estão configuradas.')
  }

  const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`
  
  const data = {
    email_address: email,
    status: 'pending', // Pending triggers the double opt-in email natively
  }

  // Use PUT instead of POST to handle existing members without failing completely
  // Mailchimp uses the MD5 hash of the lowercase email for the member ID
  
  // Hash calculation (for edge case, if needed, but PUT to /members actually creates if not exists as well in some structures)
  // Actually Mailchimp API v3 standard for upsert requires MD5 hash of lowercased email in URL:
  // PUT /lists/{list_id}/members/{subscriber_hash}
  
  // Since crypto is standard in Node.js:
  const crypto = require('crypto')
  const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
  
  const upsertUrl = `${url}/${subscriberHash}`

  const response = await fetch(upsertUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (!response.ok) {
    // If the error is 400 but the title says "Member Exists" it might be caught here (though PUT usually avoids this, status could be 'subscribed' already)
    const status = responseData.status || response.status
    throw new MailchimpError(responseData.detail || 'Erro ao comunicar com Mailchimp', status)
  }

  return responseData
}
