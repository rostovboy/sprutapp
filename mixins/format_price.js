export default {
  filters: {
    format_price(value) {
      let val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
  }
}
