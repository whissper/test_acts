
class OptionsBuilder {
	
	//constructor
	constructor() {
		this.formedString = '';
	}
	
	/** DETAILED WAY **/
	//start paragraph
	startParagraph(paramTags, textVal) {
		this.formedString += 
		`<w:p>
			<w:pPr>
				<w:contextualSpacing/>
				<w:rFonts w:ascii="Tahoma" w:hAnsi="Tahoma" w:cs="Tahoma"/>
				<w:sz w:val="18"/>
				<w:szCs w:val="18"/>`;
			
		for (let param of paramTags) {
			this.formedString +=
				param;
		}
			
		this.formedString +=	
			`</w:pPr>
			<w:r>
				<w:t xml:space="preserve">${textVal}</w:t>
			</w:r>`;
			
		return this;
	}
	//end paragraph
	endParagraph() {
		this.formedString +=	
		`</w:p>`;
		
		return this;
	}
	//set underline
	setUnderline() {
		this.formedString +=
		`<w:u w:val="single"/>`;
		
		return this;
	}
	//set delimiter
	setDelimiter(textVal) {
		this.formedString +=
		`<w:r>
			<w:t xml:space="preserve">${textVal}</w:t>
		</w:r>`;
		
		return this;
	}
	//start option
	startOption() {
		this.formedString +=
		`<w:r>
			<w:rPr>
				<w:rFonts w:ascii="Tahoma" w:hAnsi="Tahoma" w:cs="Tahoma"/>
				<w:sz w:val="18"/>
				<w:szCs w:val="18"/>`;
			
		return this;
	}
	//end option
	endOption(textVal) {
		this.formedString +=
			`</w:rPr>
			<w:t xml:space="preserve">${textVal}</w:t>
		</w:r>`;
		
		return this;
	}
	//set bold font style for option
	setBold() {
		this.formedString += `<w:b/>`;
		
		return this;
	}
	//get finally formed string
	getFormedString() {
		return this.formedString;
	}
	
	/** SIMPLE WAY **/
	paragraph(paramTags, textVal) {
		this.startParagraph(paramTags, textVal);
		
		return this;
	}
	
	option(textVal, checked, isBold) {
		this.startOption();
		if (isBold) {
			this.setBold();
		}
		if (checked) {
			this.setUnderline();
		}			
		this.endOption(textVal);
		
		return this;
	}
	
	delimiter(textVal) {
		this.setDelimiter(textVal);
		
		return this;
	}
	
	fetch() {
		this.endParagraph();
		
		return this.formedString;
	}
	
}

module.exports = OptionsBuilder;