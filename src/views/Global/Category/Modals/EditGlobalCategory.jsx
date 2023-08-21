import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

import { editGlobalCategory } from 'actions';

class EditGlobalCategory extends Component {
    state = {
        ... this.props.globalCategory_to_edit
    };

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setDesc = event => {
        this.setState({ desc: event.target.value });
    };

    _setTypeId = event => {
        this.setState({ typeId: event.target.value });
    };

    _setCategoryGroupId = event => {
        this.setState({ glbCategoryGroupId: event.target.value });
    };

    _editGlobalCategory = () => {
        const 
            id = this.props.globalCategory_to_edit.id;
        if (id) {
            this.props.editGlobalCategory(id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, globalCategory_to_edit } = this.props;
        return (
            <Modal
                aria-labelledby="Edit category"
                aria-describedby="Modal for editing category"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT category"
                                cardSubtitle="Edit the form below to edit the selected category"
                                content={
                                    <div>
                                        <Grid container>
                                           <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Group"
                                                    id="category-group-id"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setCategoryGroupId }
                                                    value={ globalCategory_to_edit.glbCategoryGroupId }
                                                    defaultValue={ globalCategory_to_edit.glbCategoryGroupId }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="category-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ globalCategory_to_edit.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Discription"
                                                    id="category-desc"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ globalCategory_to_edit.desc }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Type Id"
                                                    id="category-type-id"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTypeId }
                                                    defaultValue={ globalCategory_to_edit.typeId }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editGlobalCategory}>Edit</Button>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit *10
    },
});

const mapStateToProps = state => {
    const { globalCategory_to_edit } = state.globalCategoryReducer;
    return { globalCategory_to_edit };
};

const EditModalWrapped = withStyles(styles)(EditGlobalCategory);

export default connect(mapStateToProps, { editGlobalCategory })(EditModalWrapped);
