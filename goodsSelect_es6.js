
class GoodsSelect{

	constructor(data,nav,list){

		this.data = data;
		this.selectedArr = [];

		this.nav = document.querySelector(`#${nav}`);
		this.list = document.querySelector(`#${list}`);
		this.a = null;
		this.close = null;
		
		this.init();
	}

	init(){

		let listHTML = '';

		this.data.map(item => {

			let alist = '';

			item.data.map(ele=>{
				alist += 
				`<a href="javascript:;">
					${ele.desc}
					<i class="id" style="display:none;">
						${ele.id}
					</i>
				</a>`;
			});

			listHTML += 
			`<li>
				${item.sort}
				<span class="order" style="display:none;">
					${item.order}
				</span>
				${alist}
			</li>`;	
		})

		this.list.innerHTML = listHTML;

		this.choose();
	}

	choose(){

		this.a = this.list.querySelectorAll("a");
		
		let _this = this;

		for(let i=0; i<this.a.length; i++){
			this.a[i].onclick=function(){
				_this.click(this);	
			}
		}
	}

	cancel(){

		this.close = this.nav.querySelectorAll("a");

		for(let i=0; i<this.close.length; i++){

			let _this = this;
			
			this.close[i].onclick = function(){

				let id = Number(this.querySelector("i").innerHTML);
				let index = null;

				_this.selectedArr.map((item,index)=>{
					if(item.data.id === id){
						_this.selectedArr.splice(index,1);
					}
				})

				_this.addSelected();
				
			}
		}
	}

	click(ele){

		let id = Number( ele.querySelector("i").innerHTML );
		let order = Number( ele.parentNode.querySelector("span").innerHTML );
		let aData = '';
		let bool = false;

		this.data.map((item,index) => {
			item.data.map(ele=>{
				if(ele.id === id){
					aData = ele;
				}
			})
		})

		
		bool = this.selectedArr.some( item => item.order === order );

		if(bool){
			this.selectedArr.map((item,index) => {
				
				if(item.order === order){
					item.data = aData
				}
			});
		}else{
			this.selectedArr.push({data:aData,order});	
		}
		
		this.selectedArr.sort(function(a,b){return a.order-b.order});

		this.addSelected();
	}

	addSelected(){

		let navHTML = '';

		this.selectedArr.map(item=>{
			navHTML += 
				`<mark>
					${item.data.desc}
					<a href="javascript:;">
						<i style="display:none;">${item.data.id}</i>x
					</a>
				</mark>`;	
		})
		
		this.nav.innerHTML = '你的选择：' + navHTML;
		
		this.cancel();	
	}

}

var GS = new GoodsSelect(data,"choose","type");