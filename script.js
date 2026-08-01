let listajs=[]
let idjs=1
let receita2=0
const envio_formulario=document.getElementById('formulario')
const nome=document.getElementById('nome') 
const categoria=document.getElementById('categoria')
const preco=document.getElementById('preco')
const quantidade=document.getElementById('quantidade')





const listahtml=document.getElementById('listahtml')
const alertas=document.getElementById('alertas')




function atualizarestatisticas(){
    receita2=0
    const quantidadegeral=document.getElementById('total-geral')
    const receita=document.getElementById('total-receitas')
    const produtomaiscar=document.getElementById("produto_maiscaro")
    const produto_maisbarato=document.getElementById("produto_maisbarato")
    const produto_menor=document.getElementById('produto_menor')
const total=listajs.reduce(function(soma,produto){
    return soma+ produto.quantidade
},0)
    listajs.forEach(produto=>{
        receita2+=(produto.preco * produto.quantidade)
    })
    const receitaconvertida=receita2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const produtos2=listajs.map(produto=>produto.preco)
    const produto_menor2=listajs.map(produto=>produto.quantidade)
    const mairpreco= Math.max(...produtos2)
    const menorpreco=Math.min(...produtos2)
    receita.innerText=receitaconvertida
    quantidadegeral.innerText=total
    produto_maisbarato.innerText=menorpreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    produtomaiscar.innerText=mairpreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    produto_menor.innerText=Math.min(...produto_menor2)
}



function renderizarlista(){
    listahtml.innerHTML=''
   
   listajs.forEach(function(produto){
    const valorconvertido=produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const li=document.createElement('li')
     li.innerHTML= `nome do produto: ${produto.nome}
        categoria do produto:${produto.categoria}
        preço do produto : ${valorconvertido}
        quantidade do produto: ${produto.quantidade}

    `
    listahtml.appendChild(li)
   })
   atualizarestatisticas()

}


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
    const produtorepetido=listajs.some(produto=>produto.nome.toLowerCase()===nome.value.toLowerCase())
    if(produtorepetido){
        alertas.innerText='Já existe esse produto'
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