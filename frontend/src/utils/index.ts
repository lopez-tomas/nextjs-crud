interface IGender {
  M: string;
  m: string;
  F: string;
  f: string;
}

let inParagraph = (action: string, item: string, itemGender: keyof IGender): string => {
  const gender: IGender = {
    M: 'este',
    m: 'este',
    F: 'esta',
    f: 'esta',
  }

  return `<p>¿Quieres ${action} ${gender[itemGender]} ${item}?</p>`
}

let inSpan = (text: string): string => {
  return `<span className='font-bold underline-offset-4 hover:underline'>${text}</span>`
}

export {
  inParagraph,
  inSpan
}