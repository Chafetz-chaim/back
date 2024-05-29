import type { Schema, Attribute } from '@strapi/strapi';

export interface UiRelativeGerman extends Schema.Component {
  collectionName: 'components_ui_relative_germen';
  info: {
    displayName: 'relativeGerman';
    icon: 'sun';
  };
  attributes: {
    german_relative: Attribute.Relation<
      'ui.relative-german',
      'oneToOne',
      'api::german-relative.german-relative'
    >;
    relationType: Attribute.String;
  };
}

export interface UiRelativesNot extends Schema.Component {
  collectionName: 'components_ui_relatives_nots';
  info: {
    displayName: 'relativesNot';
    icon: 'command';
  };
  attributes: {
    relative: Attribute.Relation<
      'ui.relatives-not',
      'oneToOne',
      'api::relative.relative'
    >;
    kind: Attribute.Enumeration<['father', 'mother']>;
    areMariege: Attribute.Boolean;
    areDevorced: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ui.relative-german': UiRelativeGerman;
      'ui.relatives-not': UiRelativesNot;
    }
  }
}
