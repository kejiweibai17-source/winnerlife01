import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon} from '@sanity/icons'

const SEMINAR_CONFIG_DOC_ID = 'seminarConfig'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('內容管理')
    .items([
      S.listItem()
        .title('說明會場次')
        .icon(CalendarIcon)
        .child(
          S.document()
            .schemaType('seminarConfig')
            .documentId(SEMINAR_CONFIG_DOC_ID)
            .title('說明會場次'),
        ),
      S.divider(),
      S.documentTypeListItem('post').title('文章'),
      S.documentTypeListItem('category').title('分類'),
      S.documentTypeListItem('author').title('作者'),
    ])
