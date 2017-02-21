/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

import { changeSetting } from 'state/config/action';

const EditablePassword = ( props ) => {
	const { value, name } = props;

	return (
		<input type="text" value={ value } className="editable-input password" name={ name } onChange={ props.onChangeValue } />
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
)( EditablePassword );
