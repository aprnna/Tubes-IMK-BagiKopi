export default function formatRupiah(angka){
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(angka);
  const result = formatter.split(',00').join('')
  return result
}