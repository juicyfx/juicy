declare namespace Composer {
  /**
   * List of authors that contributed to the package. This is typically the main maintainers, not the full list.
   */
  type Authors = {
    /**
     * Full name of the author.
     */
    name: string
    /**
     * Email address of the author.
     */
    email?: string
    /**
     * Homepage URL for the author.
     */
    homepage?: string
    /**
     * Author's role in the project.
     */
    role?: string
  }[]
  type Repository =
    | ComposerRepository
    | VcsRepository
    | PathRepository
    | ArtifactRepository
    | PearRepository
    | PackageRepository

  interface Composer {
    /**
     * Package name, including 'vendor-name/' prefix.
     */
    name: string
    /**
     * Package type, either 'library' for common packages, 'composer-plugin' for plugins, 'metapackage' for empty packages, or a custom type ([a-z0-9-]+) defined by whatever project this package applies to.
     */
    type?: string
    /**
     * DEPRECATED: Forces the package to be installed into the given subdirectory path. This is used for autoloading PSR-0 packages that do not contain their full path. Use forward slashes for cross-platform compatibility.
     */
    "target-dir"?: string
    /**
     * Short package description.
     */
    description: string
    keywords?: string[]
    /**
     * Homepage URL for the project.
     */
    homepage?: string
    /**
     * Relative path to the readme document.
     */
    readme?: string
    /**
     * Package version, see https://getcomposer.org/doc/04-schema.md#version for more info on valid schemes.
     */
    version?: string
    /**
     * Package release date, in 'YYYY-MM-DD', 'YYYY-MM-DD HH:MM:SS' or 'YYYY-MM-DDTHH:MM:SSZ' format.
     */
    time?: string
    /**
     * License name. Or an array of license names.
     */
    license?: string | unknown[]
    authors?: Authors
    /**
     * This is a hash of package name (keys) and version constraints (values) that are required to run this package.
     */
    require?: {
      [k: string]: string
    }
    /**
     * This is a hash of package name (keys) and version constraints (values) that can be replaced by this package.
     */
    replace?: {
      [k: string]: string
    }
    /**
     * This is a hash of package name (keys) and version constraints (values) that conflict with this package.
     */
    conflict?: {
      [k: string]: string
    }
    /**
     * This is a hash of package name (keys) and version constraints (values) that this package provides in addition to this package's name.
     */
    provide?: {
      [k: string]: string
    }
    /**
     * This is a hash of package name (keys) and version constraints (values) that this package requires for developing it (testing tools and such).
     */
    "require-dev"?: {
      [k: string]: string
    }
    /**
     * This is a hash of package name (keys) and descriptions (values) that this package suggests work well with it (this will be suggested to the user during installation).
     */
    suggest?: {
      [k: string]: string
    }
    /**
     * Composer options.
     */
    config?: {
      /**
       * The timeout in seconds for process executions, defaults to 300 (5mins).
       */
      "process-timeout"?: number
      /**
       * If true, the Composer autoloader will also look for classes in the PHP include path.
       */
      "use-include-path"?: boolean
      /**
       * The install method Composer will prefer to use, defaults to auto and can be any of source, dist, auto, or a hash of {"pattern": "preference"}.
       */
      "preferred-install"?:
        | string
        | {
        [k: string]: unknown
      }
      /**
       * Composer allows repositories to define a notification URL, so that they get notified whenever a package from that repository is installed. This option allows you to disable that behaviour, defaults to true.
       */
      "notify-on-install"?: boolean
      /**
       * A list of protocols to use for github.com clones, in priority order, defaults to ["git", "https", "http"].
       */
      "github-protocols"?: string[]
      /**
       * A hash of domain name => github API oauth tokens, typically {"github.com":"<token>"}.
       */
      "github-oauth"?: {
        [k: string]: string
      }
      /**
       * A hash of domain name => gitlab API oauth tokens, typically {"gitlab.com":"<token>"}.
       */
      "gitlab-oauth"?: {
        [k: string]: string
      }
      /**
       * A hash of domain name => gitlab private tokens, typically {"gitlab.com":"<token>"}.
       */
      "gitlab-token"?: {
        [k: string]: string
      }
      /**
       * A hash of domain name => bearer authentication token, for example {"example.com":"<token>"}.
       */
      bearer?: {
        [k: string]: string
      }
      /**
       * Defaults to `false`. If set to true all HTTPS URLs will be tried with HTTP instead and no network level encryption is performed. Enabling this is a security risk and is NOT recommended. The better way is to enable the php_openssl extension in php.ini.
       */
      "disable-tls"?: boolean
      /**
       * Defaults to `true`. If set to true only HTTPS URLs are allowed to be downloaded via Composer. If you really absolutely need HTTP access to something then you can disable it, but using "Let's Encrypt" to get a free SSL certificate is generally a better alternative.
       */
      "secure-http"?: boolean
      /**
       * A way to set the path to the openssl CA file. In PHP 5.6+ you should rather set this via openssl.cafile in php.ini, although PHP 5.6+ should be able to detect your system CA file automatically.
       */
      cafile?: string
      /**
       * If cafile is not specified or if the certificate is not found there, the directory pointed to by capath is searched for a suitable certificate. capath must be a correctly hashed certificate directory.
       */
      capath?: string
      /**
       * A hash of domain name => {"username": "...", "password": "..."}.
       */
      "http-basic"?: {
        [k: string]: {
          /**
           * The username used for HTTP Basic authentication
           */
          username: string
          /**
           * The password used for HTTP Basic authentication
           */
          password: string
          [k: string]: unknown
        }
      }
      /**
       * What to do after prompting for authentication, one of: true (store), false (do not store) or "prompt" (ask every time), defaults to prompt.
       */
      "store-auths"?: string | boolean
      /**
       * This is a hash of package name (keys) and version (values) that will be used to mock the platform packages on this machine.
       */
      platform?: {
        [k: string]: string
      }
      /**
       * The location where all packages are installed, defaults to "vendor".
       */
      "vendor-dir"?: string
      /**
       * The location where all binaries are linked, defaults to "vendor/bin".
       */
      "bin-dir"?: string
      /**
       * The location where old phar files are stored, defaults to "$home" except on XDG Base Directory compliant unixes.
       */
      "data-dir"?: string
      /**
       * The location where all caches are located, defaults to "~/.composer/cache" on *nix and "%LOCALAPPDATA%\Composer" on windows.
       */
      "cache-dir"?: string
      /**
       * The location where files (zip downloads) are cached, defaults to "{$cache-dir}/files".
       */
      "cache-files-dir"?: string
      /**
       * The location where repo (git/hg repo clones) are cached, defaults to "{$cache-dir}/repo".
       */
      "cache-repo-dir"?: string
      /**
       * The location where vcs infos (git clones, github api calls, etc. when reading vcs repos) are cached, defaults to "{$cache-dir}/vcs".
       */
      "cache-vcs-dir"?: string
      /**
       * The default cache time-to-live, defaults to 15552000 (6 months).
       */
      "cache-ttl"?: number
      /**
       * The cache time-to-live for files, defaults to the value of cache-ttl.
       */
      "cache-files-ttl"?: number
      /**
       * The cache max size for the files cache, defaults to "300MiB".
       */
      "cache-files-maxsize"?: string | number
      /**
       * Whether to use the Composer cache in read-only mode.
       */
      "cache-read-only"?: boolean
      /**
       * The compatibility of the binaries, defaults to "auto" (automatically guessed) and can be "full" (compatible with both Windows and Unix-based systems).
       */
      "bin-compat"?: "auto" | "full"
      /**
       * The default style of handling dirty updates, defaults to false and can be any of true, false or "stash".
       */
      "discard-changes"?: string | boolean
      /**
       * Optional string to be used as a suffix for the generated Composer autoloader. When null a random one will be generated.
       */
      "autoloader-suffix"?: string
      /**
       * Always optimize when dumping the autoloader.
       */
      "optimize-autoloader"?: boolean
      /**
       * If false, the composer autoloader will not be prepended to existing autoloaders, defaults to true.
       */
      "prepend-autoloader"?: boolean
      /**
       * If true, the composer autoloader will not scan the filesystem for classes that are not found in the class map, defaults to false.
       */
      "classmap-authoritative"?: boolean
      /**
       * If true, the Composer autoloader will check for APCu and use it to cache found/not-found classes when the extension is enabled, defaults to false.
       */
      "apcu-autoloader"?: boolean
      /**
       * A list of domains to use in github mode. This is used for GitHub Enterprise setups, defaults to ["github.com"].
       */
      "github-domains"?: string[]
      /**
       * Defaults to true. If set to false, the OAuth tokens created to access the github API will have a date instead of the machine hostname.
       */
      "github-expose-hostname"?: boolean
      /**
       * A list of domains to use in gitlab mode. This is used for custom GitLab setups, defaults to ["gitlab.com"].
       */
      "gitlab-domains"?: string[]
      /**
       * Defaults to true.  If set to false, globally disables the use of the GitHub API for all GitHub repositories and clones the repository as it would for any other repository.
       */
      "use-github-api"?: boolean
      /**
       * The default archiving format when not provided on cli, defaults to "tar".
       */
      "archive-format"?: string
      /**
       * The default archive path when not provided on cli, defaults to ".".
       */
      "archive-dir"?: string
      /**
       * Defaults to true. If set to false, Composer will not create .htaccess files in the composer home, cache, and data directories.
       */
      "htaccess-protect"?: boolean
      /**
       * Defaults to false. If set to true, Composer will sort packages when adding/updating a new dependency.
       */
      "sort-packages"?: boolean
      /**
       * Defaults to true. If set to false, Composer will not create a composer.lock file.
       */
      lock?: boolean
      /**
       * Defaults to "php-only" which checks only the PHP version. Setting to true will also check the presence of required PHP extensions. If set to false, Composer will not create and require a platform_check.php file as part of the autoloader bootstrap.
       */
      "platform-check"?: boolean | string
      [k: string]: unknown
    }
    /**
     * Arbitrary extra data that can be used by plugins, for example, package of type composer-plugin may have a 'class' key defining an installer class name.
     */
    extra?:
      | {
      [k: string]: unknown
    }
      | unknown[]
    autoload?: Autoload
    /**
     * Description of additional autoload rules for development purpose (eg. a test suite).
     */
    "autoload-dev"?: {
      /**
       * This is a hash of namespaces (keys) and the directories they can be found into (values, can be arrays of paths) by the autoloader.
       */
      "psr-0"?: {
        [k: string]: string[]
      }
      /**
       * This is a hash of namespaces (keys) and the PSR-4 directories they can map to (values, can be arrays of paths) by the autoloader.
       */
      "psr-4"?: {
        [k: string]: string[]
      }
      /**
       * This is an array of paths that contain classes to be included in the class-map generation process.
       */
      classmap?: unknown[]
      /**
       * This is an array of files that are always required on every request.
       */
      files?: unknown[]
      [k: string]: unknown
    }
    /**
     * Options for creating package archives for distribution.
     */
    archive?: {
      /**
       * A base name for archive.
       */
      name?: string
      /**
       * A list of patterns for paths to exclude or include if prefixed with an exclamation mark.
       */
      exclude?: unknown[]
      [k: string]: unknown
    }
    /**
     * A set of additional repositories where packages can be found.
     */
    repositories?: (
      | Repository
      | {
      [k: string]: false
    }
      )[]
    /**
     * The minimum stability the packages must have to be install-able. Possible values are: dev, alpha, beta, RC, stable.
     */
    "minimum-stability"?: string
    /**
     * If set to true, stable packages will be preferred to dev packages when possible, even if the minimum-stability allows unstable packages.
     */
    "prefer-stable"?: boolean
    /**
     * A set of files, or a single file, that should be treated as binaries and symlinked into bin-dir (from config).
     */
    bin?: string[]
    /**
     * DEPRECATED: A list of directories which should get added to PHP's include path. This is only present to support legacy projects, and all new code should preferably use autoloading.
     */
    "include-path"?: string[]
    /**
     * Script listeners that will be executed before/after some events.
     */
    scripts?: {
      /**
       * Occurs before the install command is executed, contains one or more Class::method callables or shell commands.
       */
      "pre-install-cmd"?: unknown[] | string
      /**
       * Occurs after the install command is executed, contains one or more Class::method callables or shell commands.
       */
      "post-install-cmd"?: unknown[] | string
      /**
       * Occurs before the update command is executed, contains one or more Class::method callables or shell commands.
       */
      "pre-update-cmd"?: unknown[] | string
      /**
       * Occurs after the update command is executed, contains one or more Class::method callables or shell commands.
       */
      "post-update-cmd"?: unknown[] | string
      /**
       * Occurs before the status command is executed, contains one or more Class::method callables or shell commands.
       */
      "pre-status-cmd"?: unknown[] | string
      /**
       * Occurs after the status command is executed, contains one or more Class::method callables or shell commands.
       */
      "post-status-cmd"?: unknown[] | string
      /**
       * Occurs before a package is installed, contains one or more Class::method callables or shell commands.
       */
      "pre-package-install"?: unknown[] | string
      /**
       * Occurs after a package is installed, contains one or more Class::method callables or shell commands.
       */
      "post-package-install"?: unknown[] | string
      /**
       * Occurs before a package is updated, contains one or more Class::method callables or shell commands.
       */
      "pre-package-update"?: unknown[] | string
      /**
       * Occurs after a package is updated, contains one or more Class::method callables or shell commands.
       */
      "post-package-update"?: unknown[] | string
      /**
       * Occurs before a package has been uninstalled, contains one or more Class::method callables or shell commands.
       */
      "pre-package-uninstall"?: unknown[] | string
      /**
       * Occurs after a package has been uninstalled, contains one or more Class::method callables or shell commands.
       */
      "post-package-uninstall"?: unknown[] | string
      /**
       * Occurs before the autoloader is dumped, contains one or more Class::method callables or shell commands.
       */
      "pre-autoload-dump"?: unknown[] | string
      /**
       * Occurs after the autoloader is dumped, contains one or more Class::method callables or shell commands.
       */
      "post-autoload-dump"?: unknown[] | string
      /**
       * Occurs after the root-package is installed, contains one or more Class::method callables or shell commands.
       */
      "post-root-package-install"?: unknown[] | string
      /**
       * Occurs after the create-project command is executed, contains one or more Class::method callables or shell commands.
       */
      "post-create-project-cmd"?: unknown[] | string
      [k: string]: unknown
    }
    /**
     * Descriptions for custom commands, shown in console help.
     */
    "scripts-descriptions"?: {
      [k: string]: string
    }
    support?: {
      /**
       * Email address for support.
       */
      email?: string
      /**
       * URL to the issue tracker.
       */
      issues?: string
      /**
       * URL to the forum.
       */
      forum?: string
      /**
       * URL to the wiki.
       */
      wiki?: string
      /**
       * IRC channel for support, as irc://server/channel.
       */
      irc?: string
      /**
       * URL to the support chat.
       */
      chat?: string
      /**
       * URL to browse or download the sources.
       */
      source?: string
      /**
       * URL to the documentation.
       */
      docs?: string
      /**
       * URL to the RSS feed.
       */
      rss?: string
      [k: string]: unknown
    }
    /**
     * A list of options to fund the development and maintenance of the package.
     */
    funding?: {
      /**
       * Type of funding or platform through which funding is possible.
       */
      type?: string
      /**
       * URL to a website with details on funding and a way to fund the package.
       */
      url?: string
      [k: string]: unknown
    }[]
    /**
     * A set of string or regex patterns for non-numeric branch names that will not be handled as feature branches.
     */
    "non-feature-branches"?: string[]
    /**
     * Internal use only, do not specify this in composer.json. Indicates whether this version is the default branch of the linked VCS repository. Defaults to false.
     */
    "default-branch"?: boolean
    /**
     * Indicates whether this package has been abandoned, it can be boolean or a package name/URL pointing to a recommended alternative. Defaults to false.
     */
    abandoned?: boolean | string
    /**
     * A key to store comments in
     */
    _comment?: unknown[] | string
  }

  /**
   * Description of how the package can be autoloaded.
   */
  interface Autoload {
    /**
     * This is a hash of namespaces (keys) and the directories they can be found in (values, can be arrays of paths) by the autoloader.
     */
    "psr-0"?: {
      [k: string]: string[]
    }
    /**
     * This is a hash of namespaces (keys) and the PSR-4 directories they can map to (values, can be arrays of paths) by the autoloader.
     */
    "psr-4"?: {
      [k: string]: string[]
    }
    /**
     * This is an array of paths that contain classes to be included in the class-map generation process.
     */
    classmap?: unknown[]
    /**
     * This is an array of files that are always required on every request.
     */
    files?: unknown[]
    /**
     * This is an array of patterns to exclude from autoload classmap generation. (e.g. "exclude-from-classmap": ["/test/", "/tests/", "/Tests/"]
     */
    "exclude-from-classmap"?: unknown[]

    [k: string]: unknown
  }

  interface ComposerRepository {
    type: "composer"
    url: string
    canonical?: boolean
    only?: string[]
    exclude?: string[]
    options?: {
      [k: string]: unknown
    }
    allow_ssl_downgrade?: boolean
    "force-lazy-providers"?: boolean

    [k: string]: unknown
  }

  interface VcsRepository {
    type:
      | "vcs"
      | "github"
      | "git"
      | "gitlab"
      | "git-bitbucket"
      | "hg"
      | "hg-bitbucket"
      | "fossil"
      | "perforce"
      | "svn"
    url: string
    canonical?: boolean
    only?: string[]
    exclude?: string[]
    "no-api"?: boolean
    "secure-http"?: boolean
    "svn-cache-credentials"?: boolean
    "trunk-path"?: string | boolean
    "branches-path"?: string | boolean
    "tags-path"?: string | boolean
    "package-path"?: string
    depot?: string
    branch?: string
    unique_perforce_client_name?: string
    p4user?: string
    p4password?: string

    [k: string]: unknown
  }

  interface PathRepository {
    type: "path"
    url: string
    canonical?: boolean
    only?: string[]
    exclude?: string[]
    options?: {
      symlink?: boolean | null
      [k: string]: unknown
    }

    [k: string]: unknown
  }

  interface ArtifactRepository {
    type: "artifact"
    url: string
    canonical?: boolean
    only?: string[]
    exclude?: string[]

    [k: string]: unknown
  }

  interface PearRepository {
    type: "pear"
    url: string
    canonical?: boolean
    only?: string[]
    exclude?: string[]
    "vendor-alias"?: string

    [k: string]: unknown
  }

  interface PackageRepository {
    type: "package"
    canonical?: boolean
    only?: string[]
    exclude?: string[]
    package: InlinePackage | InlinePackage[]

    [k: string]: unknown
  }

  interface InlinePackage {
    /**
     * Package name, including 'vendor-name/' prefix.
     */
    name: string
    type?: string
    /**
     * DEPRECATED: Forces the package to be installed into the given subdirectory path. This is used for autoloading PSR-0 packages that do not contain their full path. Use forward slashes for cross-platform compatibility.
     */
    "target-dir"?: string
    description?: string
    keywords?: string[]
    homepage?: string
    version: string
    time?: string
    license?: string | unknown[]
    authors?: Authors
    require?: {
      [k: string]: string
    }
    replace?: {
      [k: string]: string
    }
    conflict?: {
      [k: string]: string
    }
    provide?: {
      [k: string]: string
    }
    "require-dev"?: {
      [k: string]: string
    }
    suggest?: {
      [k: string]: string
    }
    extra?:
      | {
      [k: string]: unknown
    }
      | unknown[]
    autoload?: Autoload
    archive?: {
      exclude?: unknown[]
      [k: string]: unknown
    }
    /**
     * A set of files, or a single file, that should be treated as binaries and symlinked into bin-dir (from config).
     */
    bin?: string[]
    /**
     * DEPRECATED: A list of directories which should get added to PHP's include path. This is only present to support legacy projects, and all new code should preferably use autoloading.
     */
    "include-path"?: string[]
    source?: {
      type: string
      url: string
      reference: string
      mirrors?: unknown[]
      [k: string]: unknown
    }
    dist?: {
      type: string
      url: string
      reference?: string
      shasum?: string
      mirrors?: unknown[]
      [k: string]: unknown
    }

    [k: string]: unknown
  }

}
