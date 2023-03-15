import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useConfirm = () => {
  const router = useRouter()
  const errorMessage = ref('')
  const confirmCode = ref('')
  const disableConfirm = ref(true)
  const clearInput = ref(false)
  const successInput = ref(false)
  const timer = ref(90)
  const timerText = ref('')

  function handleInput(val: number | string) {
    val = val.toString()
    if (val.length >= 6) {
      disableConfirm.value = false
      successInput.value = true
    } else {
      successInput.value = false
      disableConfirm.value = true
    }
    confirmCode.value = val
  }

  const setTimer = setInterval(() => {
    if (timer.value > 59) {
      timerText.value = '0' + 1 + ':' + (timer.value - 60)
    } else if (timer.value < 60 && timer.value > 9) {
      timerText.value = '00' + ':' + timer.value
    } else {
      timerText.value = '00' + ':' + '0' + timer.value
    }
    timer.value = timer.value - 1
  }, 1000)

  const resetConfirmation = () => {
    clearInput.value = true
    successInput.value = false
    clearInterval(setTimer)
    timerText.value = ''
  }

  setTimeout(resetConfirmation, 91000)

  const handleConfirmSubmit = () => {
    alert(confirmCode.value)
    router.push({ name: 'auth_send' })
  }

  const resendConfirmationCode = () => {
    alert('Resend confirmation code')
  }

  onUnmounted(() => clearInterval(setTimer))

  return {
    disableConfirm,
    errorMessage,
    timerText,
    handleConfirmSubmit,
    handleInput,
    resendConfirmationCode
  }
}
