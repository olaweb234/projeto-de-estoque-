let listajs=[]
let idjs=1
const envio_formulario=document.getElementById('formulario')
const nome=document.getElementById('nome') 
const categoria=document.getElementById('categoria')
const preco=document.getElementById('preco')
const quantidade=document.getElementById('quantidade')





const listahtml=document.getElementById('listahtml')
const alertas=document.getElementById('alertas')


function renderizarlista(){
    listahtml.innerHTML=''
   
   listajs.forEach(function(produto){
    const valorconvertido=produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const li=document.createElement('li')
    li.classList.add('listahtml')
     li.innerHTML= `nome do produto: ${produto.nome}
        categoria do produto:${produto.categoria}
        preço do produto : ${valorconvertido}
        quantidade do produto: ${produto.quantidade}

    `
    listahtml.appendChild(li)
   })}


function validacaodoscampos(){
    if(nome.value===''|| categoria.value==='' || preco.value ===''|| quantidade.value===''){
        alertas.innerHTML='Os campos devem ser preenchido'
        return false
    }

    const precoconvertido=parseFloat(preco.value)
    const quantidadeconvertida=parseInt(quantidade.value)
    if(isNaN(precoconvertido)|| isNaN(quantidadeconvertida)|| precoconvertido<0 || quantidadeconvertida<0){
       alertas.innerHTML='Os campos devem ser preenchidos e tem que ser um valor valido'
        return false
      }
      return true
}

function limparcampos(){
    nome.value=''
    categoria.value=''
    preco.value=''
    quantidade.value=''
}

envio_formulario.addEventListener('submit',function(){
    event.preventDefault()
    const precoconvertido=parseFloat(preco.value)
    const quantidadeconvertida=parseInt(quantidade.value)
    if(!validacaodoscampos()){
        return
    }
    const objetoestoque={
        id:idjs,
        nome:nome.value,
        categoria:categoria.value,
        preco:precoconvertido,
        quantidade:quantidadeconvertida
    }
    idjs++
    listajs.push(objetoestoque)
    limparcampos()
    renderizarlista()
})