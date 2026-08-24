import {CalendarIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Singleton：說明會報名表單的場次清單。
 * 客戶主要改這裡；欄位刻意精簡（日期 + 顯示文字）。
 */
export const seminarConfigType = defineType({
  name: 'seminarConfig',
  title: '說明會場次',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: '標題（內部用）',
      type: 'string',
      initialValue: '說明會場次設定',
      hidden: true,
    }),
    defineField({
      name: 'sessions',
      title: '報名場次清單',
      description:
        '出現在聯絡表單／說明會報名的選項。可拖曳調整順序；關閉「顯示」即暫時下架。過期場次請直接刪除。',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'session',
          title: '場次',
          fields: [
            defineField({
              name: 'date',
              title: '日期',
              type: 'date',
              validation: (Rule) => Rule.required(),
              options: {dateFormat: 'YYYY-MM-DD'},
            }),
            defineField({
              name: 'labelZh',
              title: '顯示文字（中文）',
              description: '例：9/18（五）— 台北場',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'labelJa',
              title: '顯示文字（日文）',
              description: '例：9/18（金）— 台北会場',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'enabled',
              title: '顯示在表單',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              date: 'date',
              labelZh: 'labelZh',
              enabled: 'enabled',
            },
            prepare({date, labelZh, enabled}) {
              return {
                title: labelZh || date || '未命名場次',
                subtitle: enabled === false ? '已隱藏' : date || '',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: '說明會場次'}
    },
  },
})
