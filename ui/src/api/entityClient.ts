import { Entity } from '@/models'
import { HttpClient } from './httpClient'
import { EntityResponse } from './responsesModels/entityResponse.model'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"

export const entityClient = () => {

    const client = new HttpClient(API_URL)

    return {
        getAllEntities: async (): Promise<Entity[]> => {
            const response = await client.get<EntityResponse[]>("/entities")
            const entites: Entity[] = response.map((item) => ({
                ...item,
                entity: {
                    id: item.entityType.id,
                    type: item.entityType.type
                }
            }))

            return entites
        },

    }
}
