import { toast } from 'react-toastify';

export function toastMess(status, message) {
  if(status) {
    toast.success(message)
  } else {
    toast.error(message)
  }
}