import { Field } from 'payload'

export const climbEditorField = (): Field => ({
  name: 'climb-editor',
  type: 'ui',
  label: 'Routes',
  admin: {
    components: {
      Field: '@/fields/climbEditor/ClimbEditorField',
      Cell: '@/fields/climbEditor/ClimbEditorCell',
    },
  },
})
