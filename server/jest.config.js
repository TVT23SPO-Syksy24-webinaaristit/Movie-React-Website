//tämä konfiguraatio on tarpeen koska projekti käyttää SWC transpilaattoria eikä babelia
export default {
transform: {
'^.+\\.js$': '@swc/jest',
}
};