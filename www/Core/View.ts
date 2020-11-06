export default class View {
	PHJS;
	view;
	template;

	constructor(PHJS, view, template = "front") {
		this.view = view;
		this.template = template;
		this.PHJS = PHJS;
		this.checkTemplate();
		this.checkView();
	}

	checkView() {
		if (!this.PHJS.file_exist("Views/"+this.view+".phjs")) {
			this.PHJS.die("La vue "+this.view+" n'existe pas");
		}
	}

	checkTemplate() {
		if (!this.PHJS.file_exist("Views/templates/"+this.template+".phjs")) {
			this.PHJS.die("Le template "+this.template+" n'existe pas");
		}
	}

	addModal = (PHJS, modal, form) => {
		if (!PHJS.file_exist("Modals/"+modal+".phjs")) {
			PHJS.die("Modals/"+modal+".phjs does not exist")
		}
		PHJS.varsToPass.form = form;
		PHJS.include("Modals/"+modal+".phjs", null, true);
	};

	assign(key, value) {
		this.PHJS.varsToPass[key] = value;
	}

	render() {
		this.PHJS.varsToPass.view = this.view;
		this.PHJS.varsToPass.addModal = this.addModal;
		let root = "";
		let splittedDirname = __dirname.split("/");
		for (let i=0;i<splittedDirname.length-1;i++) {
			root += splittedDirname[i]+"/";
		}
		this.PHJS.varsToPass.root = root;
		this.PHJS.include("Views/templates/"+this.template+".phjs", null, true);
	}
};
