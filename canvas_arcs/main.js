const canvas = document.querySelector('canvas')

canvas.height=window.innerHeight
canvas.width=window.innerWidth

const c = canvas.getContext('2d')

//line
c.beginPath()
c.moveTo(250,250)
c.lineTo(300,500)
c.strokeStyle='red'
c.stroke()

c.fillStyle='blue'
c.fillRect(100,100,100,100)

//arc
c.beginPath()
c.arc(300,300,50,0,Math.PI,false)
c.stroke()

for(var i =0;i<1000;i++){
    var x= Math.random()*window.innerWidth
    var y= Math.random()*window.innerHeight
    c.beginPath()
    c.arc(x,y,20,0,Math.PI*2,false)
    c.strokeStyle='red'
    c.stroke()
}