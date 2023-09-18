type Props = {
    pdfUrl:string
}

function PDFViewer({pdfUrl}: Props) {
  return (
    <iframe src={'https://docs.google.com/gview?url='+pdfUrl+'&embedded=true'} className="w-full h-full rounded-md" frameBorder="0"></iframe>
  )
}

export default PDFViewer