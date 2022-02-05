import ReactModal from 'react-modal'
import close from '../../../assets/images/close.svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleConfirm: () => void
}

export function ConfirmRemoveRoomModal({
  isOpen,
  onClose,
  handleConfirm,
}: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <img src={close} alt="" />
      <h2>Encerrar sala</h2>

      <p>Tem certeza que você deseja encerrar esta sala?</p>

      <div>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" onClick={handleConfirm}>
          Sim, encerrar
        </button>
      </div>
    </ReactModal>
  )
}
