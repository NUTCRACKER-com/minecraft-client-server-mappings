# Third-party data

The NUTclient backend syncs public server mappings of other clients **every 24 hours at runtime**. 

| Source | License | What we use |
| --- | --- | --- |
| [LunarClient/ServerMappings](https://github.com/LunarClient/ServerMappings) | MIT, Copyright (c) 2023 Moonsworth, LLC | name, addresses, icon/banner (linked, not copied) |
| [TyranisMC/Mappings](https://github.com/TyranisMC/Mappings) | MIT, Copyright (c) 2023 Moonsworth, LLC | name, addresses, icon/banner (linked, not copied) |
| [NoRiskClient/nrc-server-mappings](https://github.com/NoRiskClient/nrc-server-mappings) | GPL-3.0 | name, addresses, categories, disabled modules, icon/banner (linked, not copied) |

The MIT notice above must stay if data from those two repositories is ever copied into this repository.
Anything copied from the GPL-3.0 NoRisk repository would have to be published under GPL-3.0 as well, so it is deliberately only fetched, never copied.
Entries in `servers/` of this repository always take priority over synced ones.

## Update

This repository is now licensed **GPL-3.0** (see `LICENSE`). The 95 entries in `servers/nrc-*` were imported from NoRiskClient/nrc-server-mappings (GPL-3.0, incl. their icons/banners, addresses remapped to our schema, module IDs mapped to NUTclient IDs). Lunar/Tyranis (MIT, Moonsworth, LLC) stay live-synced only.

## Lunar import

`servers/lunar-*` were imported from LunarClient/ServerMappings (MIT, Copyright (c) 2023 Moonsworth, LLC): name, addresses, game types as categories, and the logo as icon (only logos under 120 KB). Servers listed in their `inactive.json` and addresses already used by another entry were skipped. Banners were not copied.

MIT License notice: Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions: the above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
