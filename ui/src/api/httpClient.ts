import { LocalStorageItems } from '@/types'

export class HttpClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private getToken = (): string => {
        const token = localStorage.getItem(LocalStorageItems.TOKEN)

        if (!token) return ""

        return token
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.getToken()
        const headers = new Headers(options.headers || {})

        headers.set("Content-Type", "application/json")
        if (token) headers.set("Authorization", `Bearer ${token}`)

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        })

        if (!response.ok) {
            if (response.status === 401) {
                console.warn("Token expirado o inválido")
            }
            throw new Error(`HTTP error: ${response.status}`)
        }

        // Aquí parseamos automáticamente y devolvemos tipado
        const data = (await response.json()) as T
        return data
    }

    public get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint)
    }

    public post<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        })
    }

    public put<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        })
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" })
    }

}
