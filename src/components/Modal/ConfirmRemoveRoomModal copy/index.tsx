import ReactModal from 'react-modal'
import close from '../../../assets/images/close.svg'
import { Button } from '../../Button'
import styles from './styles.module.scss'

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
      overlayClassName="modal-overlay"
      className={`modal ${styles.container}`}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <img src={close} alt="" />
      <h2>Encerrar sala</h2>

      <p>Tem certeza que você deseja encerrar esta sala?</p>

      <div>
        <Button className={styles.cancelButton} type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          className={styles.confirmButton}
          type="button"
          onClick={handleConfirm}
        >
          Sim, encerrar
        </Button>
      </div>
    </ReactModal>
  )
}
