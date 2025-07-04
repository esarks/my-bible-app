/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 9ALKC1eSkKzzoBpvUcK3nT
// Component: 6AmSVyeMyGPY

import * as React from "react";

import {
  Flex as Flex__,
  MultiChoiceArg,
  PlasmicDataSourceContextProvider as PlasmicDataSourceContextProvider__,
  PlasmicIcon as PlasmicIcon__,
  PlasmicImg as PlasmicImg__,
  PlasmicLink as PlasmicLink__,
  PlasmicPageGuard as PlasmicPageGuard__,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  Stack as Stack__,
  StrictProps,
  Trans as Trans__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants,
  generateOnMutateForSpec,
  generateStateOnChangeProp,
  generateStateOnChangePropForCodeComponents,
  generateStateValueProp,
  get as $stateGet,
  hasVariant,
  initializeCodeComponentStates,
  initializePlasmicStates,
  makeFragment,
  omit,
  pick,
  renderPlasmicSlot,
  set as $stateSet,
  useCurrentUser,
  useDollarState,
  usePlasmicTranslator,
  useTrigger,
  wrapWithClassName
} from "@plasmicapp/react-web";
import {
  DataCtxReader as DataCtxReader__,
  useDataEnv,
  useGlobalActions
} from "@plasmicapp/react-web/lib/host";

import { BaseText } from "@plasmicpkgs/react-aria/skinny/registerText";

import "@plasmicapp/react-web/lib/plasmic.css";
import "../defaultStyles.css"; // plasmic-import: global/defaultcss
import "../antd_5_hostless/plasmic.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import "../plasmic_rich_components/plasmic.css"; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import "../library_tailwind_3_4_color_tokens/plasmic.css"; // plasmic-import: 5ZtnypMovRHeeP3YTdPCYL/projectcss
import "../library_tailwind_3_4_number_tokens/plasmic.css"; // plasmic-import: 4vjRXvnb4XuY6J15w9oRcQ/projectcss
import "../plasmic_login_page.css"; // plasmic-import: 9ALKC1eSkKzzoBpvUcK3nT/projectcss
import "./PlasmicDescription.css"; // plasmic-import: 6AmSVyeMyGPY/css

createPlasmicElementProxy;

export type PlasmicDescription__VariantMembers = {};
export type PlasmicDescription__VariantsArgs = {};
type VariantPropType = keyof PlasmicDescription__VariantsArgs;
export const PlasmicDescription__VariantProps = new Array<VariantPropType>();

export type PlasmicDescription__ArgsType = { children?: React.ReactNode };
type ArgPropType = keyof PlasmicDescription__ArgsType;
export const PlasmicDescription__ArgProps = new Array<ArgPropType>("children");

export type PlasmicDescription__OverridesType = {
  root?: Flex__<typeof BaseText>;
  freeBox?: Flex__<"div">;
};

export interface DefaultDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

const $$ = {};

function PlasmicDescription__RenderFunc(props: {
  variants: PlasmicDescription__VariantsArgs;
  args: PlasmicDescription__ArgsType;
  overrides: PlasmicDescription__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {},
        Object.fromEntries(
          Object.entries(props.args).filter(([_, v]) => v !== undefined)
        )
      ),
    [props.args]
  );

  const $props = {
    ...args,
    ...variants
  };

  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = useCurrentUser?.() || {};

  return (
    <BaseText
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        "__wab_instance",
        "root_reset_9ALKC1eSkKzzoBpvUcK3nT",
        "plasmic_default_styles",
        "plasmic_mixins",
        "plasmic_tokens",
        "Description__root__xMcIv"
      )}
      slot={"description"}
    >
      <div
        data-plasmic-name={"freeBox"}
        data-plasmic-override={overrides.freeBox}
        className={classNames(
          "plasmic_default__all",
          "plasmic_default__div",
          "Description__freeBox__cwvct"
        )}
      >
        {renderPlasmicSlot({
          defaultContents: "Description\u2026",
          value: args.children
        })}
      </div>
    </BaseText>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "freeBox"],
  freeBox: ["freeBox"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: typeof BaseText;
  freeBox: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicDescription__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicDescription__VariantsArgs;
    args?: PlasmicDescription__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicDescription__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicDescription__ArgsType, ReservedPropsType> &
    // Specify overrides for each element directly as props
    Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    // Specify props for the root element
    Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicDescription__ArgProps,
          internalVariantPropNames: PlasmicDescription__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicDescription__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicDescription";
  } else {
    func.displayName = `PlasmicDescription.${nodeName}`;
  }
  return func;
}

export const PlasmicDescription = Object.assign(
  // Top-level PlasmicDescription renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    freeBox: makeNodeComponent("freeBox"),

    // Metadata about props expected for PlasmicDescription
    internalVariantProps: PlasmicDescription__VariantProps,
    internalArgProps: PlasmicDescription__ArgProps
  }
);

export default PlasmicDescription;
/* prettier-ignore-end */
