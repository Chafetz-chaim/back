import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    scans: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::scan.scan'
    >;
    projects: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::project.project'
    >;
    mid_gens: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::mid-gen.mid-gen'
    >;
    relationWithGermanDeporter: Attribute.Enumeration<
      ['father', 'mother', 'grandFather', 'grandMother', 'me']
    >;
    my: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    applicant: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::applicant.applicant'
    >;
    customers: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::customer.customer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApplicantApplicant extends Schema.CollectionType {
  collectionName: 'applicants';
  info: {
    singularName: 'applicant';
    pluralName: 'applicants';
    displayName: 'applicant';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstName: Attribute.String;
    SuranameName: Attribute.String;
    users_permissions_user: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    project: Attribute.Relation<
      'api::applicant.applicant',
      'manyToOne',
      'api::project.project'
    >;
    customers: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::customer.customer'
    >;
    DateOfBirth: Attribute.Date;
    isMinor: Attribute.Boolean;
    previousNames: Attribute.String;
    suranmeatBirth: Attribute.String;
    placeOfBirth: Attribute.String;
    sex: Attribute.Enumeration<['male', 'female', 'non-binary']>;
    relationWithGerman: Attribute.Integer;
    CountryOfBirth: Attribute.Relation<
      'api::applicant.applicant',
      'manyToOne',
      'api::country.country'
    >;
    countryOfResidency: Attribute.Relation<
      'api::applicant.applicant',
      'manyToOne',
      'api::country.country'
    >;
    currentAddress: Attribute.String;
    hasAltAdressForPost: Attribute.Boolean & Attribute.DefaultTo<false>;
    alternateAdress: Attribute.String;
    phoneNumber: Attribute.String;
    email: Attribute.Email;
    citizenships: Attribute.Relation<
      'api::applicant.applicant',
      'oneToMany',
      'api::citizenship.citizenship'
    >;
    maritalStatus: Attribute.Enumeration<
      [
        'single',
        'married',
        'divorced',
        'widowed',
        'inasameSexCivilPartnership',
        'sameSexCivilPartnershipDissolved',
        'others'
      ]
    >;
    otherForMarialStatus: Attribute.String;
    currentMariageSince: Attribute.Date;
    previous_marriges: Attribute.Relation<
      'api::applicant.applicant',
      'oneToMany',
      'api::previous-marrige.previous-marrige'
    >;
    hasCriminalRecord: Attribute.Boolean;
    hasCriminalOpenCase: Attribute.Boolean;
    places_of_residances: Attribute.Relation<
      'api::applicant.applicant',
      'oneToMany',
      'api::places-of-residance.places-of-residance'
    >;
    germanyAddresForGermanDeported: Attribute.String;
    original_citizen: Attribute.Relation<
      'api::applicant.applicant',
      'manyToOne',
      'api::original-citizen.original-citizen'
    >;
    relativeGerma: Attribute.Component<'ui.relative-german', true>;
    isAdopted: Attribute.Boolean;
    dateOfAdoption: Attribute.Date;
    relativesNotGerman: Attribute.Component<'ui.relatives-not', true>;
    fileNumberInLawyer: Attribute.String;
    submissionDate: Attribute.Date;
    fileNumberInOthorities: Attribute.String;
    e15form: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    attach: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    birthCertificate: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    marriage_certificate: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    marriage_certificate_translate: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    divorce_certifacates: Attribute.Relation<
      'api::applicant.applicant',
      'oneToMany',
      'api::scan.scan'
    >;
    divorce_certifacate_translate: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    tamtzit: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    name_change_cert: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    general_other_doc: Attribute.Relation<
      'api::applicant.applicant',
      'oneToMany',
      'api::scan.scan'
    >;
    ReferenceCriminalRecord: Attribute.String;
    PowerOfAttornyLawyer: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    power_of_attorny_kid: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::scan.scan'
    >;
    phisical_birth_cert: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    original_copy_of_m_cerf: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    signed_translated_m_cert: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    d_cert_phisical_doc: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    phisical_doc_cert_d_trans: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    needPassport: Attribute.Boolean;
    needSecPassport: Attribute.Boolean;
    needBirth: Attribute.Boolean;
    needMar: Attribute.Boolean;
    needDiv: Attribute.Boolean;
    needProofOfFatherhood: Attribute.Boolean;
    needNameChangeScan: Attribute.Boolean;
    needMultipleGeneral: Attribute.Boolean;
    needRegistrationSummary: Attribute.Boolean;
    fcPassport: Attribute.Media;
    fcSecPassport: Attribute.Media;
    fcBirth: Attribute.Media;
    fcMar: Attribute.Media;
    fcDiv: Attribute.Media;
    fcProofOfFatherhood: Attribute.Media;
    fcNameChange: Attribute.Media;
    fcRegistrationSummary: Attribute.Media;
    fcMultipleGeneral: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCitizenshipCitizenship extends Schema.CollectionType {
  collectionName: 'citizenships';
  info: {
    singularName: 'citizenship';
    pluralName: 'citizenships';
    displayName: 'citizenship';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    country: Attribute.Relation<
      'api::citizenship.citizenship',
      'manyToOne',
      'api::country.country'
    >;
    acquisitionDate: Attribute.Date;
    acquiringReason: Attribute.Enumeration<['ancestry', 'naturalization']>;
    isValide: Attribute.Boolean & Attribute.DefaultTo<true>;
    applicant: Attribute.Relation<
      'api::citizenship.citizenship',
      'manyToOne',
      'api::applicant.applicant'
    >;
    relative: Attribute.Relation<
      'api::citizenship.citizenship',
      'manyToOne',
      'api::relative.relative'
    >;
    passport: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'api::scan.scan'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountryCountry extends Schema.CollectionType {
  collectionName: 'countries';
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'country';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    applicants: Attribute.Relation<
      'api::country.country',
      'oneToMany',
      'api::applicant.applicant'
    >;
    citizenships: Attribute.Relation<
      'api::country.country',
      'oneToMany',
      'api::citizenship.citizenship'
    >;
    places_of_residances: Attribute.Relation<
      'api::country.country',
      'oneToMany',
      'api::places-of-residance.places-of-residance'
    >;
    relatives: Attribute.Relation<
      'api::country.country',
      'oneToMany',
      'api::relative.relative'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerCustomer extends Schema.CollectionType {
  collectionName: 'customers';
  info: {
    singularName: 'customer';
    pluralName: 'customers';
    displayName: 'customer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstName: Attribute.String;
    applicants: Attribute.Relation<
      'api::customer.customer',
      'manyToMany',
      'api::applicant.applicant'
    >;
    users_permissions_users: Attribute.Relation<
      'api::customer.customer',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    projects: Attribute.Relation<
      'api::customer.customer',
      'manyToMany',
      'api::project.project'
    >;
    surname: Attribute.String;
    phoneNumber: Attribute.String;
    email: Attribute.Email;
    refferers: Attribute.Relation<
      'api::customer.customer',
      'manyToMany',
      'api::refferer.refferer'
    >;
    leads: Attribute.Relation<
      'api::customer.customer',
      'manyToMany',
      'api::lead.lead'
    >;
    countryCodePhone: Attribute.String;
    birth: Attribute.Date;
    address: Attribute.String;
    midGenLevel: Attribute.Enumeration<
      ['first', 'second', 'third', 'forth', 'fifth']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFileKindFileKind extends Schema.CollectionType {
  collectionName: 'file_kinds';
  info: {
    singularName: 'file-kind';
    pluralName: 'file-kinds';
    displayName: 'fileKind';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    scans: Attribute.Relation<
      'api::file-kind.file-kind',
      'manyToMany',
      'api::scan.scan'
    >;
    phisical_docs: Attribute.Relation<
      'api::file-kind.file-kind',
      'oneToMany',
      'api::phisical-doc.phisical-doc'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::file-kind.file-kind',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::file-kind.file-kind',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFirstPersonInGermanyFirstPersonInGermany
  extends Schema.CollectionType {
  collectionName: 'first_person_in_germanies';
  info: {
    singularName: 'first-person-in-germany';
    pluralName: 'first-person-in-germanies';
    displayName: 'firstPersonInGermany';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    birthDate: Attribute.Date;
    address: Attribute.String;
    dateOfArrival: Attribute.Date;
    original_citizens: Attribute.Relation<
      'api::first-person-in-germany.first-person-in-germany',
      'oneToMany',
      'api::original-citizen.original-citizen'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::first-person-in-germany.first-person-in-germany',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::first-person-in-germany.first-person-in-germany',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGermanRelativeGermanRelative extends Schema.CollectionType {
  collectionName: 'german_relatives';
  info: {
    singularName: 'german-relative';
    pluralName: 'german-relatives';
    displayName: 'germanRelative';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    surname: Attribute.String;
    firstName: Attribute.String;
    issueDate: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::german-relative.german-relative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::german-relative.german-relative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLeadLead extends Schema.CollectionType {
  collectionName: 'leads';
  info: {
    singularName: 'lead';
    pluralName: 'leads';
    displayName: 'lead';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amountOfAplicant: Attribute.Integer;
    amountOfMinorAplicant: Attribute.Integer;
    amountOfPotential: Attribute.Integer;
    customers: Attribute.Relation<
      'api::lead.lead',
      'manyToMany',
      'api::customer.customer'
    >;
    projects: Attribute.Relation<
      'api::lead.lead',
      'manyToMany',
      'api::project.project'
    >;
    files: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::lead.lead', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::lead.lead', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMidGenMidGen extends Schema.CollectionType {
  collectionName: 'mid_gens';
  info: {
    singularName: 'mid-gen';
    pluralName: 'mid-gens';
    displayName: 'midGen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    sureName: Attribute.String;
    users_permissions_users: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    scans: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'manyToMany',
      'api::scan.scan'
    >;
    me: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    attach: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    birthCertificate: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    marriage_certificate: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    marriage_certificate_translate: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    divorce_certifacate_translate: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToMany',
      'api::scan.scan'
    >;
    divorce_certifacate: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToMany',
      'api::scan.scan'
    >;
    tamtzit: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    name_change_cert: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    deth_cert: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::scan.scan'
    >;
    phisical_birth_cert: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    original_copy_of_m_cerf: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    signed_translated_m_cert: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    d_cert_phisical_doc: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    d_cert_trans_phisical_doc: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    needBirth: Attribute.Boolean;
    fcBirth: Attribute.Media;
    needDiv: Attribute.Boolean;
    fcDiv: Attribute.Media;
    needMar: Attribute.Boolean;
    fcMar: Attribute.Media;
    needDeathCert: Attribute.Boolean;
    fcDeathCert: Attribute.Media;
    needProofOfFatherhood: Attribute.Boolean;
    fcProofOfFatherhood: Attribute.Media;
    needNameChange: Attribute.Boolean;
    fcNameChange: Attribute.Media;
    needMultipleGeneral: Attribute.Boolean;
    fcMultipleGeneral: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mid-gen.mid-gen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOriginalCitizenOriginalCitizen
  extends Schema.CollectionType {
  collectionName: 'original_citizens';
  info: {
    singularName: 'original-citizen';
    pluralName: 'original-citizens';
    displayName: 'originalCitizen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    surname: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    firstName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    reasonForPersecution: Attribute.Enumeration<
      ['alsJ\u00FCdinVerfogt', 'alsJ\u00FCdinVerfolgt']
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    applicants: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::applicant.applicant'
    >;
    PersonHaveGermanCitizenshipBetween1933and1945: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    WasLostOn: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ReasonForLoss: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    excludedFromCollectiveNaturalization: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dateOfExclusion: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    areaOfExclusion: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    applicationDenied: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dateOfDenial: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cityOfAuthority: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    projects: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::project.project'
    >;
    otherHatInDeutschland: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    residenceInGermany: Attribute.Enumeration<['always', 'since', 'unknown']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    first_person_in_germany: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'manyToOne',
      'api::first-person-in-germany.first-person-in-germany'
    >;
    birth_certificate: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    marriage_certificate: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    marriage_certificate_translate: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    divorce_certifacate: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::scan.scan'
    >;
    divorce_certifacate_translate: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::scan.scan'
    >;
    proofof33_45residancy: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    citizeship_doc: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    otherDocs_archive: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'manyToMany',
      'api::scan.scan'
    >;
    tamtzit: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    name_change_cert: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    deth_certificate: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::scan.scan'
    >;
    general_other_doc: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::scan.scan'
    >;
    phisical_birth_cert: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    initialInquiryScanBirth: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    requestSentScanBirth: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    scanRecivedBirth: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    meldungs_karte_scans: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::scan.scan'
    >;
    original_copy_of_m_cerf: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    signed_translated_m_cert: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    initialInquiryScanMerriage: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    requestSentScanMarriege: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    scanRecivedMarriege: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    d_cert: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    phisical_doc_cert_d_trans: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    maidenName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    birthDate: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    links: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    info: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dateOfDenialText: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    yearOfDenialText: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    lastAddress: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    placeOfBirth: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dateOfDenialLead: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needBirth: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcBirth: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needDeathCert: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcDeathCert: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needIsraeliPassport: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcIsraeliPassport: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needOldPassport: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcOldPassport: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needDiv: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcDiv: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needMar: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcMar: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needRegistrationSummary: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcRegistrationSummary: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needProofOfFatherhood: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcProofOfFatherhood: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needNameChange: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcNameChange: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needMultipeFromGermany: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcMultipeFromGermany: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needMultipeFromIsrael: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcMultipeFromIsrael: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needMultipleFromTravel: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcMultipleFromTravel: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needMultipleGeneral: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fcMultipleGeneral: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::original-citizen.original-citizen',
      'oneToMany',
      'api::original-citizen.original-citizen'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPhisicalDocPhisicalDoc extends Schema.CollectionType {
  collectionName: 'phisical_docs';
  info: {
    singularName: 'phisical-doc';
    pluralName: 'phisical-docs';
    displayName: 'phisicalDoc';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    file_kind: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'manyToOne',
      'api::file-kind.file-kind'
    >;
    arrived: Attribute.Boolean;
    arriveInIsrael: Attribute.Boolean;
    sendedToAuthorities: Attribute.Boolean;
    sendedToTranslate: Attribute.Boolean;
    applicant_phisical_birth_cert: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::applicant.applicant'
    >;
    mid_gen_phisical_birth_cert: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    original_citizen_phisical_birth_cert: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    original_copy_of_m_cerf_applicant: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::applicant.applicant'
    >;
    original_copy_of_m_cerf_mid_gen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    original_copy_of_m_cerf_original_citizen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    applicant_signed_translated_m_cert: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::applicant.applicant'
    >;
    signed_translated_m_cert_mid_gen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    signed_translated_m_cert_original_citizen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    d_cert_original_citizen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    d_cert_applicant: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::applicant.applicant'
    >;
    d_cert_mid_gen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    d_cert_trans_mid_gen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    cert_d_trans_original_citizen: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    cert_d_trans_applicant: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::applicant.applicant'
    >;
    birth_cert_relative: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'api::relative.relative'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::phisical-doc.phisical-doc',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlacesOfResidancePlacesOfResidance
  extends Schema.CollectionType {
  collectionName: 'places_of_residances';
  info: {
    singularName: 'places-of-residance';
    pluralName: 'places-of-residances';
    displayName: 'placesOfResidance';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    country: Attribute.Relation<
      'api::places-of-residance.places-of-residance',
      'manyToOne',
      'api::country.country'
    >;
    city: Attribute.String;
    since: Attribute.Date;
    until: Attribute.Date;
    applicant: Attribute.Relation<
      'api::places-of-residance.places-of-residance',
      'manyToOne',
      'api::applicant.applicant'
    >;
    relative: Attribute.Relation<
      'api::places-of-residance.places-of-residance',
      'manyToOne',
      'api::relative.relative'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::places-of-residance.places-of-residance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::places-of-residance.places-of-residance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPreviousMarrigePreviousMarrige
  extends Schema.CollectionType {
  collectionName: 'previous_marriges';
  info: {
    singularName: 'previous-marrige';
    pluralName: 'previous-marriges';
    displayName: 'previousMarrige';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    from: Attribute.Date;
    until: Attribute.Date;
    applicant: Attribute.Relation<
      'api::previous-marrige.previous-marrige',
      'manyToOne',
      'api::applicant.applicant'
    >;
    relative: Attribute.Relation<
      'api::previous-marrige.previous-marrige',
      'manyToOne',
      'api::relative.relative'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::previous-marrige.previous-marrige',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::previous-marrige.previous-marrige',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    users_permissions_users: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    scans: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::scan.scan'
    >;
    allScansUploadedAndChecked: Attribute.Boolean & Attribute.DefaultTo<false>;
    applicants: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'api::applicant.applicant'
    >;
    customers: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::customer.customer'
    >;
    original_citizen: Attribute.Relation<
      'api::project.project',
      'manyToOne',
      'api::original-citizen.original-citizen'
    >;
    ArchivesVollmacht: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'api::scan.scan'
    >;
    name: Attribute.String;
    leads: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::lead.lead'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReffererRefferer extends Schema.CollectionType {
  collectionName: 'refferers';
  info: {
    singularName: 'refferer';
    pluralName: 'refferers';
    displayName: 'refferer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    customers: Attribute.Relation<
      'api::refferer.refferer',
      'manyToMany',
      'api::customer.customer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::refferer.refferer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::refferer.refferer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRelativeRelative extends Schema.CollectionType {
  collectionName: 'relatives';
  info: {
    singularName: 'relative';
    pluralName: 'relatives';
    displayName: 'relative';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    surName: Attribute.String;
    firstName: Attribute.String;
    previousNames: Attribute.String;
    birthDate: Attribute.Date;
    cityOfBirth: Attribute.String;
    birthCountry: Attribute.Relation<
      'api::relative.relative',
      'manyToOne',
      'api::country.country'
    >;
    previous_marriges: Attribute.Relation<
      'api::relative.relative',
      'oneToMany',
      'api::previous-marrige.previous-marrige'
    >;
    citizenships: Attribute.Relation<
      'api::relative.relative',
      'oneToMany',
      'api::citizenship.citizenship'
    >;
    places_of_residances: Attribute.Relation<
      'api::relative.relative',
      'oneToMany',
      'api::places-of-residance.places-of-residance'
    >;
    dateOfDeth: Attribute.Date;
    proofof33_45residancy: Attribute.Relation<
      'api::relative.relative',
      'oneToOne',
      'api::scan.scan'
    >;
    general_cert: Attribute.Relation<
      'api::relative.relative',
      'oneToMany',
      'api::scan.scan'
    >;
    MeldungsKarte_doc: Attribute.Relation<
      'api::relative.relative',
      'oneToMany',
      'api::scan.scan'
    >;
    scan_birth_cert: Attribute.Relation<
      'api::relative.relative',
      'oneToOne',
      'api::scan.scan'
    >;
    phisical_doc_birth_cert: Attribute.Relation<
      'api::relative.relative',
      'oneToOne',
      'api::phisical-doc.phisical-doc'
    >;
    links: Attribute.Text;
    info: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::relative.relative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::relative.relative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiScanScan extends Schema.CollectionType {
  collectionName: 'scans';
  info: {
    singularName: 'scan';
    pluralName: 'scans';
    displayName: 'scan';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    kind: Attribute.Enumeration<
      [
        'passport',
        'birthcertificate',
        'marriagecertificate',
        'powerofattorneyarchives',
        'powerofattorneylawyer',
        'fatherhudappruval'
      ]
    >;
    file: Attribute.Media;
    users_permissions_users: Attribute.Relation<
      'api::scan.scan',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    file_kinds: Attribute.Relation<
      'api::scan.scan',
      'manyToMany',
      'api::file-kind.file-kind'
    >;
    projects: Attribute.Relation<
      'api::scan.scan',
      'manyToMany',
      'api::project.project'
    >;
    mid_gens: Attribute.Relation<
      'api::scan.scan',
      'manyToMany',
      'api::mid-gen.mid-gen'
    >;
    uploaded: Attribute.Boolean;
    approved: Attribute.Boolean;
    applicant: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    mid_gen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    attached: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    birthSertifacteApplicant: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    original_citizen_birth_certificate: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    mid_gen_birthCertificate: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    passport_scan: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::citizenship.citizenship'
    >;
    marriage_certificate_applicant: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    marriage_certificate_midgen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    marriage_certificate_original_citizen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    original_citizen_marriage_certificate_translate: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    mid_gen_marriage_certificate_translate: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    applicant_marriage_certificate_translate: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    applicant_divorce_certifacate: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::applicant.applicant'
    >;
    applicant_divorce_certifacate_translate: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    mid_gen_divorce_certifacate_translate: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::mid-gen.mid-gen'
    >;
    mid_gen_divorce_certifacate: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::mid-gen.mid-gen'
    >;
    original_citizen_divorce_certifacate: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::original-citizen.original-citizen'
    >;
    original_citizen_divorce_certifacate_translate: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::original-citizen.original-citizen'
    >;
    original_citizen_proofof33_45residancy: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    relative_proofof33_45residancy: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::relative.relative'
    >;
    citizeship_doc_original_citizen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    other_archive_original_citizens: Attribute.Relation<
      'api::scan.scan',
      'manyToMany',
      'api::original-citizen.original-citizen'
    >;
    applicant_tamtzit: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    tamtzit_mid_gen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    tamtzit_original_citizen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    name_change_cert_applicant: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    name_change_cert_mid_gen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    name_change_cert_original_citizen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    deth_cert_mid_gen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::mid-gen.mid-gen'
    >;
    deth_cert_original_citizen: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::original-citizen.original-citizen'
    >;
    general_other_doc_applicant: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::original-citizen.original-citizen'
    >;
    applicant_general_other_doc: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::applicant.applicant'
    >;
    relative_general_cert: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::relative.relative'
    >;
    applicant_PowerOfAttornyLawyer: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    project_ArchivesVollmacht: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::project.project'
    >;
    applicant_PowerOfAttornyKid: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::applicant.applicant'
    >;
    MeldungsKarte_original_citizen: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::original-citizen.original-citizen'
    >;
    MeldungsKarte_relative: Attribute.Relation<
      'api::scan.scan',
      'manyToOne',
      'api::relative.relative'
    >;
    birth_cert_relative: Attribute.Relation<
      'api::scan.scan',
      'oneToOne',
      'api::relative.relative'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::scan.scan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::scan.scan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::applicant.applicant': ApiApplicantApplicant;
      'api::citizenship.citizenship': ApiCitizenshipCitizenship;
      'api::country.country': ApiCountryCountry;
      'api::customer.customer': ApiCustomerCustomer;
      'api::file-kind.file-kind': ApiFileKindFileKind;
      'api::first-person-in-germany.first-person-in-germany': ApiFirstPersonInGermanyFirstPersonInGermany;
      'api::german-relative.german-relative': ApiGermanRelativeGermanRelative;
      'api::lead.lead': ApiLeadLead;
      'api::mid-gen.mid-gen': ApiMidGenMidGen;
      'api::original-citizen.original-citizen': ApiOriginalCitizenOriginalCitizen;
      'api::phisical-doc.phisical-doc': ApiPhisicalDocPhisicalDoc;
      'api::places-of-residance.places-of-residance': ApiPlacesOfResidancePlacesOfResidance;
      'api::previous-marrige.previous-marrige': ApiPreviousMarrigePreviousMarrige;
      'api::project.project': ApiProjectProject;
      'api::refferer.refferer': ApiReffererRefferer;
      'api::relative.relative': ApiRelativeRelative;
      'api::scan.scan': ApiScanScan;
    }
  }
}
