import React from 'react';
import './formErrors.scss';
import { AppProperties } from '../../../interfaces/appProperties';

type FormErrorsObj = {
	email: string,
	password: string
}

type FormErrorsType = {
	formErrorsObj: FormErrorsObj;
}

class FormErrors extends React.Component<FormErrorsType> {
	
	render() {
		return (
			<div className='formErrors'>
				{Object.keys(this.props.formErrorsObj).map((fieldName, i) => {
					if (fieldName.length > 0) {
						return (
							<p>Неверный формат</p>
						)
					} else {
						return '';
					}
				})}
			</div>
		);
	}
}

export { FormErrors };