import {sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const bids = sqliteTable('bids', {
   id: text('id').primaryKey(),
   
})