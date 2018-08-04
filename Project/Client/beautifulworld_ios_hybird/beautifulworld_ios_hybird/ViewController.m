#import "ViewController.h"
#import "ZipArchive.h"

@interface ViewController ()

@end

@implementation ViewController {
    NSString* _resourceUrl;
    NSString* _gameUrl;
    
    bool _preloadGame;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    _resourceUrl = @"http://tool.egret-labs.org/Weiduan/game/game2.zip";
    _gameUrl = @"http://tool.egret-labs.org/Weiduan/game/index.html";
    _preloadGame = true;
    
    [EgretWebViewLib initialize:@"/egretGame/preload/"];
    
    [self setExternalInterfaces];
    
    if (_preloadGame) {
        if ([EgretWebViewLib checkLoaded:_resourceUrl]) {
            [EgretWebViewLib startLocalServer];
            [EgretWebViewLib startGame:_gameUrl SuperView:self.view];
        } else {
            ZipFileLoader* loader = [EgretWebViewLib createZipFileLoader:_resourceUrl Delegate:self];
            [loader start];
        }
    } else {
        [EgretWebViewLib startGame:_gameUrl SuperView:self.view];
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setExternalInterfaces {
    [EgretWebViewLib setExternalInterface:@"callNative" Callback:^(NSString* msg) {
        NSLog(@"message: %@", msg);
        [EgretWebViewLib callExternalInterface:@"callJS" Value:@"message from native"];
    }];
}

- (void)onStart:(long)fileCount Size:(long)totalSize {
    NSLog(@"onStart %ld %ld", fileCount, totalSize);
}

- (void)onProgress:(NSString*)filePath Loaded:(long)loaded Error:(long)error Total:(long)total {
    NSLog(@"onProgress %@ %ld %ld %ld", @"", loaded, error, total);
}

- (void)onError:(NSString*)urlStr Msg:(NSString*)errMsg {
    NSLog(@"onError %@ %@", urlStr, errMsg);
}

- (void)onStop {
    NSLog(@"onStop");
    
    __block NSString* gameUrl = _gameUrl;
    dispatch_async(dispatch_get_main_queue(), ^{
        [EgretWebViewLib startLocalServer];
        [EgretWebViewLib startGame:gameUrl SuperView:self.view];
    });
}

- (bool)onUnZip:(NSString*)zipFilePath DstDir:(NSString*)dstDir {
    ZipArchive* zip = [[ZipArchive alloc] init];
    if (![zip UnzipOpenFile:zipFilePath]) {
        NSLog(@"failed to open zip file");
        return false;
    }
    
    bool result = [zip UnzipFileTo:dstDir overWrite:YES];
    if (!result) {
        NSLog(@"failed to unzip files");
        return false;
    }
    [zip UnzipCloseFile];
    return true;
}

@end
