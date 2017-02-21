/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

import { changeSetting } from 'state/config/action';

const EditableInput = ( props ) => {
	const { value, name, inputType = 'text' } = props;

	return (
		<input type={ inputType } value={ value } className="editable-input" name={ name } onChange={ props.onChangeValue } />
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onChangeValue: ev => {
			dispatch( changeSetting( ev.target.name, ev.target.value, ev.target.validity.valid ) );
		}
	};
}

export default connect(
	null,
	mapDispatchToProps
)( EditableInput );
