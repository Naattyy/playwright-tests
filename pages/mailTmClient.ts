import { APIRequestContext } from 'playwright';

export class MailTmClient {
  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string) {
    const res = await this.request.post('/token', {
      data: { address: email, password },
    });

    const data = await res.json();
    return data.token;
  }

  async waitForActivationMail(token: string) {
    for (let i = 0; i < 15; i++) {
      const res = await this.request.get('/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const messages = data['hydra:member'];

      const mail = messages.find((m: any) =>
        m.subject?.toLowerCase().includes('aktivujte') &&
        m.subject?.toLowerCase().includes('zssk')
      );

      if (mail) return mail;

      await new Promise(r => setTimeout(r, 3000));
    }

    throw new Error('Activation email not found');
  }

  async getMessageDetail(token: string, id: string) {
    const res = await this.request.get(`/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }

  extractActivationLink(body: string): string {
    const match = body.match(/https?:\/\/\S*activate\S*/);
    if (!match) throw new Error('Activation link not found');
    return match[0];
  }
}
