import {Config} from "../../interface/config";

export const config: Config = {
  //  List of possible connections that can be connected to
  "connections": [
    {
      "key": 'vagrant',
      "label": "Vagrant",
      "username": "vagrant",
      "privateKey": "C:\\Projects\\healthkit-1804\\.vagrant\\machines\\default\\virtualbox\\private_key",
      "host": "192.168.56.121",
      // A connection can have multiple targets. A target is a particular site
      "targets": [
        {
          key: "deploy",
          "label": "Deploy",
          "target": "deploy",
          variables: {
            target: 'deploy'
          },
          "commands": [
            {
              "name": "Symfony App",
              "commands": [
                'hk_app_rebuild',
                'hk_app_rebuild_and_db'
              ]
            },
            {
              "name": "App FE3",
              "commands": [
                'hk_fe3_rebuild',
              ]
            }
          ]
        }
      ]
    }
  ],
  "commands": [
    {
      key: "hk_app_rebuild",
      "label": "App Rebuild",
      "command": "hk_app_rebuild",
      "arguments": [
        {
          "name": "target",
          "default": "{{target}}",
          "type": "argument",
        }
      ]
    },
    {
      key: "hk_app_rebuild_and_db",
      "label": "App Rebuild and database",
      "command": "hk_app_rebuild_and_db",
      "arguments": [
        {
          "name": "target",
          "default": "{{target}}",
          "type": "argument",
        }
      ]
    },
    {
      key: "hk_fe3_rebuild",
      "label": "FE3 Rebuild",
      "command": "hk_fe3_rebuild",
      "arguments": [
        {
          "name": "target",
          "default": "{{target}}",
          "type": "argument",
        }
      ]
    }
  ]
};
