import {sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const bidsTable = sqliteTable('bids', {
   id: text('id').primaryKey(),
   bid: text('bid')

})