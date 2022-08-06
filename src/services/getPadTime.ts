type IPad = (time: number) => string

export const getPadTime: IPad = (time: number) => {
    return time.toString().padStart(2, '0')
}