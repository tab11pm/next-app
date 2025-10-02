import { type FieldValues, type Control, type FieldPath } from 'react-hook-form'

export type PhotoPickerFieldProps<TFieldValues extends FieldValues> = {
	name: FieldPath<TFieldValues>
	control: Control<TFieldValues>
	label?: string
	hint?: string
	/** Max file size in megabytes (default 5MB) */
	maxSizeMB?: number
	/** Disable the control */
	disabled?: boolean
	/** Optional className passthrough */
	className?: string
}
