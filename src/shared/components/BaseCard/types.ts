export type CardActions = 'edit' | 'delete'

export type CardActionPermissions = Partial<Record<CardActions, boolean>>
