import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput} from 'components';

import { editGlobalCategoryGroup } from '../../../../actions';

class EditGlobalCategoryGroup extends Component {
    state = {
        id: '',
        name: '',
        desc: '',
        typeId: ''
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

    _editGlobalCategoryGroup = () => {
        const 
            id = this.props.globalCategoryGroup_to_edit.id,
            name = this.props.globalCategoryGroup_to_edit.name,
            desc = this.props.globalCategoryGroup_to_edit.desc;
          
        if (id && name && desc) {
            this.props.editGlobalCategoryGroup(id, this.state, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, globalCategoryGroup_to_edit } = this.props;
        return (
            <Modal
                aria-labelledby="Edit category group"
                aria-describedby="Modal for editing category group"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT category group"
                                cardSubtitle="Edit the form below to edit the selected category group"
                                content={
                                    <div>
                                        <Grid container>
                                           
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Name"
                                                    id="category-group-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ globalCategoryGroup_to_edit.name }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Item name"
                                                    id="category-group-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setDesc }
                                                    defaultValue={ globalCategoryGroup_to_edit.desc }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={4} sm={4} md={4}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Type Id"
                                                    id="category-group-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setTypeId }
                                                    defaultValue={ globalCategoryGroup_to_edit.desc }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editGlobalCategoryGroup}>Edit</Button>
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
    const { globalCategoryGroup_to_edit } = state.globalCategoryGroupList;
    return { globalCategoryGroup_to_edit };
};

const EditModalWrapped = withStyles(styles)(EditGlobalCategoryGroup);

export default connect(mapStateToProps, { editGlobalCategoryGroup })(EditModalWrapped);
