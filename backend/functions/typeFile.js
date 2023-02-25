export default (name) => {
    var m = name.match(/\.([^.]+)$/)
    return m && m[1]
}