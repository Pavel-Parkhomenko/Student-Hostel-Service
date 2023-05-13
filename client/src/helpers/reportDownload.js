import { dateFormat } from "./dateFormat";
import { toastMess } from './toast'

export function reportDownload(response, name) {
  async function asyncDanger() {
    try {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}-${dateFormat().split(' ')[0]}.xlsx`
      a.click();
      URL.revokeObjectURL(url);
      toastMess(true, 'Загрузка файла...')
    } catch(err) {
      toastMess(false, 'Ошибка при загрузке файла')
    }
  }
  asyncDanger()
}