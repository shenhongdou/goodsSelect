//方法一，原生JS
function GoodsSelect(data,nav,list){

	this.data = data;
	this.selectedArr = [];

	this.nav = document.getElementById(nav);
	this.list = document.getElementById(list);
	this.a = this.list.getElementsByTagName("a");
	this.order = this.list.getElementsByTagName("span");
	this.close = null;
	
	this.init();		
}

GoodsSelect.prototype.init=function(){
	
	var listHTML = '';
	
	for(var i=0; i<this.data.length; i++){

		var alist = '';

		for(var j=0; j<this.data[i].data.length; j++){
			alist += '<a href="javascript:;">' 
					+ this.data[i].data[j].desc 
					+ '<i class="id" style="display:none;">' 
					+ this.data[i].data[j].id 
					+'</i></a>';
		}

		listHTML += '<li>' + this.data[i].sort
					+'<span class="order" style="display:none;">'
					+ this.data[i].order
					+'</span>'
					+ alist 
					+'</li>';	
	}

	this.list.innerHTML = listHTML;

	this.choose();
}

GoodsSelect.prototype.choose=function(){

	var _this = this;

	for(var i=0; i<this.a.length; i++){
		this.a[i].onclick=function(){
			_this.click(this);	
		}
	}
	
}

GoodsSelect.prototype.cancel=function(){

	for(var i=0; i<this.close.length; i++){
		var _this = this;
		
		this.close[i].onclick = function(){
			var id = Number(this.getElementsByTagName("i")[0].innerHTML);
			var index = null;
			for(var m=0;m<_this.selectedArr.length;m++){
				
				if(_this.selectedArr[m].data.id === id){
					index = m;
				}
			}

			_this.selectedArr.splice(index,1);

			_this.addSelected();
			
		}
	}
}

GoodsSelect.prototype.click = function(ele){

	var id = Number( ele.getElementsByTagName("i")[0].innerHTML );
	var order = Number( ele.parentNode.getElementsByTagName("span")[0].innerHTML );
	var aData = '';
	var bool = false;
	var index = 0;
	
	for(var j=0; j<this.data.length; j++){
		
		if(this.data[j].order === order){
			for(var k=0;k<this.data[j].data.length;k++){
				
				if(id===this.data[j].data[k].id){
					aData = this.data[j].data[k];
				}
			}
			
		}
	}
	
	if(this.selectedArr.length === 0){
		this.selectedArr.push({data:aData,order});
	}else{
		
		for(var m=0; m<this.selectedArr.length; m++){
			if(this.selectedArr[m].order === order){
				bool = true;
				index = m;
			}	
		}
		bool ? this.selectedArr[index].data = aData : this.selectedArr.push({data:aData,order});
	}

	this.selectedArr.sort(function(a,b){return a.order-b.order});

	this.addSelected();
}

GoodsSelect.prototype.addSelected = function(){

	var navHTML = '';

	for(var n=0;n<this.selectedArr.length;n++){
		navHTML += '<mark>'
				+ this.selectedArr[n].data.desc 
				+'<a href="javascript:;"><i style="display:none;">'
				+ this.selectedArr[n].data.id 
				+'</i>x</a></mark>';
	}
	
	this.nav.innerHTML = '你的选择：' + navHTML;

	this.close = this.nav.getElementsByTagName("a");
	this.cancel();	
}

var GS = new GoodsSelect(data,"choose","type");



