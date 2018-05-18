import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';

import { ProfileCard, RegularCard, Button, CustomInput, ItemGrid } from 'components';
import { logout } from '../../actions';

import avatar from 'assets/img/faces/marc.jpg';

class UserProfile extends Component {
    _logout = () => {
        this.props.logout(); // Action creator for logging out.
    };

    renderSubtitle = () => {
        if (this.props.user.role) {
            switch(this.props.user.role.name) {
                case 'super_admin':
                    return 'Super Admin';

                case 'admin':
                    return 'Admin';

                default:
                    return 'Admin';
            }
        } else {
            return 'N/A';
        }
    };

    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={8}>
                        <RegularCard
                            cardTitle="Edit Profile"
                            cardSubtitle="Complete your profile"
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Email address"
                                                id="email-address"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="email"
                                                defaultValue={this.props.user ? this.props.user.email : ''}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="First name"
                                                id="first-name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                defaultValue={this.props.user ? this.props.user.firstname : ''}
                                            />
                                        </ItemGrid>
                                        <ItemGrid xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Last name"
                                                id="last-name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                defaultValue={this.props.user ? this.props.user.lastname : ''}
                                            />
                                        </ItemGrid>
                                    </Grid>                                    
                                </div>
                            }
                            
                            footer={
                                <Button color="primary">Update Profile</Button>
                            }
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                        {
                            this.isSuperAdmin
                                ? <div style={ styles.centerItems }>
                                    <Button color="primary" round>Add User</Button>
                                </div>
                                : null
                        }

                        <ProfileCard
                            avatar={avatar}
                            subtitle={this.renderSubtitle()}
                            title={this.props.user ? `${this.props.user.firstname} ${this.props.user.lastname}` : ''}
                            footer={
                                <Button color="primary" round onClick={this._logout}>Logout</Button>
                            }
                        />
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

const styles = {
    centerItems: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFf',
        marginBottom: 20,
    },
};

const mapStateToProps = state => {
    const { user } = state.users;
    return { user };
};

export default connect(mapStateToProps, { logout })(UserProfile);
