import ReactModal from 'react-modal'
import trash from '../../../assets/images/trash.svg'
import { Button } from '../../Button'
import styles from './styles.module.scss'

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
      className={`modal ${styles.container}`}
      overlayClassName="modal-overlay"
      contentLabel="Example Modal"
    >
      <img src={trash} alt="" />
      <h2>Excluir pergunta</h2>

      <p>Tem certeza que você deseja excluir esta pergunta?</p>

      <div>
        <Button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          className={styles.confirmButton}
        >
          Sim, excluir
        </Button>
      </div>
    </ReactModal>
  )
}
