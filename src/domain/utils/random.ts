export const randomNumber = (min: number, max: number, step: number = 1) => {
  const range = (max - min) / step
  const randomStep = Math.floor(Math.random() * (range + 1))
  return min + randomStep * step
}
