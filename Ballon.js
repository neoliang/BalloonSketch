function mix(a,b,v){
	return Array.from(a,(v1,i)=> v1*v+b[i]*(1-v))
}
function ballonTail(x,y,t)
{
	bezier(x,y,
				 x-random(0,t/5),y+0.33*t,
				 x+random(0,t/5),y+0.66*t,
				 x,y+t)
}
function setup() {
	let w = 400,h = 700
	createCanvas(w, h);
	background(41,118,206);
	colorMode(RGB,1,1,1,1)
	let cols = [
		[144,197,141],	
		[70,14,174],
		[226,20,104],	
		[54,150,141],
		[235,178,40],
		[74,66,149],
		
	].map(v=>v.map(vv=>vv/255))
	
	let margin = 10
	let space = 2
	let s = 100
	let rot = (x,y,a)=>{
		translate(x,y)
		rotate(a)
		translate(-x,-y)
	}
	noStroke()
	for(let i = 0;i<600;++i)
	{
		let x = random(0,w)
		let y = abs(randomGaussian(0,h/2))
		fill(1,1,1,0.05)
		let r = 50 + abs(randomGaussian(0,50))
		let r1 = random(20,50)
		ellipse(x,y,r,r1)
	}
	stroke(0.0)
	for(let i = 0;i<80;++i){
		let x = random(margin,w-margin)
		let y = random(margin,h-margin)
		let f = (y-margin)/(h-margin)
			//let f = sqrt((x - w/2)*(x - w/2) + (y-h/2)*(y-h/2))
			//f /= 400
			if(f > 1) f = 1
			f = 1-f
			f = pow(f,1.2)
			f = 0.7*f + 0.3*noise(x/800,y/500)
			
			let px = x + randomGaussian(0,100)
			
			let py = y + randomGaussian(0,70)* f
			let a = f*random(-PI,PI)
			//rot(px+s/2,py+s/2,a)
			let value =  f
			//value = sqrt(value)
			//fill(0.+random(0.05),0.9-0.7*value,0.3+0.7*value)
			let ridx = int(random(0,cols.length));
			if(ridx >= 1)
			{
				//ridx = int(random(0,3));
			}
			let col = cols[int(ridx)]
			strokeWeight(0.3)
			stroke(0)
			//noStroke()
			//col = mix(col,cols[1],sqrt(sqrt(f)))
			col = col.map(v => (v * (1-value)+value)).map(v=>0.9*v+value*v*0.1)
			fill(col[0],col[1],col[2],0.85)
			let off = 0.5*random(0,1)*s*0.8 + (1-f) * 0.5*s*0.8
			ellipse(px,py,s-off,s-off)
			strokeWeight(1.)
			stroke(col[0],col[1],col[2],0.65)
			noFill()
			ballonTail(px,py+(s-off)/2,50+random(50))
			fill(col[0],col[1],col[2],0.5)
			ellipse(px,py+(s-off)/2-1,3,3)
			resetMatrix()
	}	
}

