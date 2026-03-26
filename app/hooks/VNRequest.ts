
const debug = true

export default function VNRequest({ method, route, payload }: { method: string, route: string, payload: any }): Promise<{ status: any, error?: string, value?: any }> {
    return new Promise<{ status: any, value: any }>(async (resolve, reject) => {
        try {
            const headers = method == 'GET' ? { 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json', payload: payload }
            const body = method != 'GET' ? JSON.stringify(payload) : null

            const response = await fetch(route, {
                method: method,
                headers: headers,
                credentials: "include",
                cache: 'no-store',
                body: body,
            });

            const responseBody = await response.json().catch(() => null);

            if (!response.ok) {
                reject({ status: response.status, error: responseBody?.error })
                throw new Error(responseBody?.error || `Error with status (${response.status})`);
            }

            resolve({ status: response.status, value: responseBody })
        } catch (error) {
            resolve({ status: false, value: null })
        } finally {
            if (debug) console.log(`[VNRequest] ${method} ${route} - Payload:`, payload)
        }
    })
}