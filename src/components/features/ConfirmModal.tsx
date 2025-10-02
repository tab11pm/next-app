export default function ConfirmModal({
	onClose,
	onConfirm,
	message,
}: {
	onClose: () => void
	onConfirm: () => void
	message: string
}) {
	return (
		<>
			<p className="text-sm text-gray-700">{message}</p>
			<div className="mt-6 flex justify-end gap-2">
				<button
					onClick={onClose}
					className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
				>
					Отмена
				</button>
				<button
					onClick={() => {
						onConfirm()
					}}
					className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
				>
					Удалить
				</button>
			</div>
		</>
	)
}
