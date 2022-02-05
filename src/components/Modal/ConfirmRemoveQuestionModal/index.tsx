import ReactModal from 'react-modal'
import trash from '../../../assets/images/trash.svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleConfirm: () => void
}

export function ConfirmRemoveQuestionModal({
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
      <img src={trash} alt="" />
      <h2>Excluir pergunta</h2>

      <p>Tem certeza que você deseja excluir esta pergunta?</p>

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
