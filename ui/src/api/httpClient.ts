import { LocalStorageItems } from '@/types'

export class HttpClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private getToken = (): string => {
        const token = localStorage.getItem(LocalStorageItems.TOKEN)

        if (!token) throw new Error()

        return token
    }

    private async request(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> {
        const token = this.getToken()
        const headers = new Headers(options.headers || {})

        headers.set("Content-Type", "application/json")
        if (token) headers.set("Authorization", `Bearer ${token}`)

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        })

        // Interceptor de respuesta
        if (!response.ok) {
            // Ejemplo: token expirado
            if (response.status === 401) {
                console.warn("Token expirado o inválido")
            }
            throw new Error(`HTTP error: ${response.status}`)
        }

        return response
    }

    public get(endpoint: string) {
        return this.request(endpoint)
    }

    public post(endpoint: string, body?: unknown) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        })
    }

    public put(endpoint: string, body?: unknown) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        })
    }

    public delete(endpoint: string) {
        return this.request(endpoint, { method: "DELETE" })
    }
}
