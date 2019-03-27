'开发环境的api配置'
import createServerApi from './create-api-server'

export default function createClientAPI ({ config, version }) {
    return createServerApi({config,version})
}
