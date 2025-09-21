import { delay, http, HttpResponse } from 'msw';
import env from '../../env';

export const handlers = [
    http.post(`${env.BACKEND_URL}/api/login`, async () => {
        await delay(2500);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
