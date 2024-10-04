import { Toast } from "toastify-react-native"

const showSuccess = (message : string) => {
    Toast.success(message)
}

const showError = (message : string) => {
    Toast.error(message)
}

const showInfo = (message : string) => {
    Toast.info(message)
}

const showWarn = (message : string) => {
    Toast.warn(message)
}
export {showSuccess, showError, showInfo, showWarn}